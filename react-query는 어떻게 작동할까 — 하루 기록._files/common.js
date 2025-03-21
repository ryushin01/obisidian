function addComment(submitButton, entryId) {
    (function ($) {
        var MAX_COMMENT_SIZE = 1000;
        var oForm = findFormObject(submitButton);
        var commentInput = oForm.querySelector('[name="comment"]');

        if (!oForm) {
            return false;
        }

        var data = {
            key: 'tistory'
        };

        var $captchaInput = $("#inputCaptcha");
        if ($captchaInput.length > 0) {
            if (!$captchaInput.val()) {
                alert('그림문자를 입력해 주세요.');
                return false;
            }

            data.captcha = $captchaInput.val();
        }

        if (oForm["name"]) {
            data.name = oForm["name"].value;
        }

        if (oForm["password"]) {
            var passwd = oForm["password"].value.trim();
            if (passwd.length == 0) {
                alert('비밀번호를 입력해 주세요.');
                return false;
            }

            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(md5(encodeURIComponent(passwd)));
            data.password = shaObj.getHash("HEX");
        }

        if (oForm["homepage"]) {
            data.homepage = oForm["homepage"].value;
        }

        if (oForm["secret"] && oForm["secret"].checked) {
            data.secret = 1;
        }

        if (oForm["comment"]) {
            data.comment = oForm["comment"].value;
        }

        if (typeof data.comment === 'string' && data.comment.length > MAX_COMMENT_SIZE) {
            alert('댓글은 ' + MAX_COMMENT_SIZE + '자까지 입력할 수 있습니다.');
            commentInput && commentInput.focus();
            return;
        }

        if (data.secret === 1 && T.config.ROLE === 'guest') {
            if (confirm('비로그인 댓글은 공개 작성만 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = T.config.LOGIN_URL;
            }
            commentInput && commentInput.focus();
            return;
        }

        if (submitButton && submitButton.setAttribute) {
            submitButton.setAttribute('disabled', true);
        }

        $.ajax({
            url: oForm.action + '?__T__=' + (new Date()).getTime(),
            method: 'post',
            data: data,
        }).done(function (r) {
            if (entryId == 0) {
                window.location = "/guestbook";
                return;
            }

            var data = r.data;
            var $comments = $("#entry" + entryId + "Comment"),
                $recentComments = $("#recentComments"),
                $commentCountOnRecentEntries = $("#commentCountOnRecentEntries" + entryId);

            $comments.html(data.commentBlock);
            $recentComments.html(data.recentCommentBlock);
            for (var i = 0; $("#commentCount" + entryId + "_" + i).length; i++) {
                $("#commentCount" + entryId + "_" + i).html(data.commentCount);
            }
            $commentCountOnRecentEntries.html("(" + data.commentCount + ")");

            if (typeof window.needCommentCaptcha !== "undefined") {
                captchaPlugin.init('complete');
            }
        }).fail(function (r) {
            alert(r.responseJSON.message);
        }).always(function () {
            if (submitButton && submitButton.setAttribute) {
                submitButton.setAttribute('disabled', false);
            }
        });

    })(tjQuery);
}

function commentRequireLoginByDormancy() {
    alert("장기간 로그인 되지 않아 계정이 휴면 상태로 전환되었습니다.");
    return false;
}

function isCustomDomain() {
    return !window.location.hostname.endsWith('tistory.com');
}

function createLoginURL(redirectURL = location.href) {
    return window.T.config.TOP_SSL_URL + '/authentication/login/?redirectUrl=' + encodeURIComponent(redirectURL);
}

function commentRequireLogin() {
    if (confirm(T.config.COMMENT_LOGIN_CONFIRM_MESSAGE)) {
        window.location = createLoginURL(isCustomDomain() ? window.TistoryBlog.tistoryUrl + window.location.pathname : location.href);
    } else {
        window.focus();
    }
}

function commentObserverForAuth(evetObj) {
    var reex = /name|password|homepage|secret|comment/,
        name;
    if (isIE) {
        name = evetObj.srcElement.name;
    } else {
        name = evetObj.target.name;
    }
    if (reex.test(name) && !(new RegExp("^entry\\d+password$").test(name))) {
        commentRequireLogin();
    }
}


if (T.config.NEED_COMMENT_LOGIN && T.config.ROLE === 'guest') {
    STD.addEventListener(document);
    document.addEventListener("click", commentObserverForAuth, false);
}


function commentVisibility(id) {
    var visibility = document.getElementById('commentVisibility_' + id);
    if (visibility.innerHTML == "[승인완료]")
        return false;
    var request = new HTTPRequest("POST", "/admin/comment/approve.php");
    visibility.innerHTML = "[승인중]";
    request.onVerify = function () {
        try {
            var result = eval("(" + this.getText() + ")");
            return (result.error == false);
        } catch (e) {
            return false;
        }
    };
    request.onSuccess = function () {
        document.getElementById('commentVisibility_' + id).innerHTML = "[승인완료]";
    };
    request.onError = function () {
        document.getElementById('commentVisibility_' + id).innerHTML = "[승인실패]";
    };
    request.send('id=' + id + '&approved=1');
}

var openWindow = '';

function alignCenter(win, width, height) {
    if (navigator.userAgent.indexOf("Chrome") == -1)
        win.moveTo(screen.width / 2 - width / 2, screen.height / 2 - height / 2);
}

function deleteComment(id) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open("/comment/manage/" + id, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function deleteGuestbookComment(id, guestbookWrittenPage) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open("/comment/manage/" + id + (guestbookWrittenPage ? "?guestbookWrittenPage=" + guestbookWrittenPage : ""), "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function commentComment(parent) {
    var visibility = document.getElementById('commentVisibility_' + parent);
    if (visibility === null || visibility.innerHTML == "[승인완료]") {
        var width = 450;
        var height = 550;
        try {
            openWindow.close();
        } catch (e) {
        }
        openWindow = window.open("/comment/comment/" + parent, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
        openWindow.focus();
        alignCenter(openWindow, width, height);
    } else {
        alert('승인 대기중인 댓글에는 답글을 작성할 수 없습니다.');
        return false;
    }
}

function guestbookCommentComment(parent, guestbookWrittenPage) {
    var visibility = document.getElementById('commentVisibility_' + parent);
    if (visibility === null || visibility.innerHTML == "[승인완료]") {
        var width = 450;
        var height = 550;
        try {
            openWindow.close();
        } catch (e) {
        }
        openWindow = window.open("/comment/comment/" + parent + (guestbookWrittenPage ? "?guestbookWrittenPage=" + guestbookWrittenPage : ""), "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
        openWindow.focus();
        alignCenter(openWindow, width, height);
    } else {
        alert('승인 대기중인 댓글에는 답글을 작성할 수 없습니다.');
        return false;
    }
}

function editEntry(parent) {
    var openWindow = window.open("/manage/post/" + parent + "?popupEditor&returnURL=CLOSEME", "tatter", "width=" + 1169 + ",height=" + 600 + ",location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0");
    openWindow?.focus();
}

window.addEventListener('message', function (event) {
    if (event.origin !== TistoryBlog.tistoryUrl) {
        return;
    }

    if (event.data === 'reload') {
        window.document.location.reload();
    }
}, false);

function guestbookComment(parent) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open("/comment/comment/" + parent, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function deleteTrackback(id, entryId) {
    if (T.config.ROLE != 'MEMBER' && T.config.ROLE != "owner") {
        if (confirm("트랙백을 삭제하기 위해서는 로그인이 필요합니다.\n로그인 하시겠습니까?")) {
            window.location = T.config.LOGIN_URL;
        }
        return false;
    }

    if (!confirm("선택된 트랙백을 삭제합니다. 계속하시겠습니까?"))
        return;

    var request = new HTTPRequest("GET", "/trackback/delete/" + id);
    request.onSuccess = function () {
        var target = document.getElementById('trackback' + id);
        if (target) {
            target.parentNode.removeChild(target);
        }
        if (document.getElementById("recentTrackbacks")) {
            document.getElementById("recentTrackbacks").innerHTML = this.getText("/response/recentTrackbackBlock");
        }
        if (document.getElementById("trackbackCount" + entryId)) {
            document.getElementById("trackbackCount" + entryId).innerHTML = this.getText("/response/trackbackView");
        }
    };
    request.onError = function () {
        alert(this.getText("/response/result"));
    };
    request.send();

}

function changeVisibility(id, visibility) {
    var request = new HTTPRequest("PUT", "/combination-button-shortcut/visibility");
    request.onVerify = function () {
        if (this._request.status === 200) {
            return true;
        } else {
            var result = eval("(" + this.getText() + ")");

            alert(result.data);
            return false;
        }
    };
    request.onSuccess = function () {
        window.location.reload();
    };
    request.send("id=" + id + "&visibility=" + visibility);
}

function showTooltip(text) {
    if (typeof text != 'undefined' && text.length > 0) {
        var $layer = tjQuery('body .layer_tooltip');
        tjQuery(".desc_g", $layer).html(text);
        $layer.show();

        setTimeout(function () {
            $layer.hide();
        }, 1000);
    }
}

function deleteEntry(id) {
    if (!confirm("이 글 및 이미지 파일을 완전히 삭제합니다. 계속하시겠습니까?")) {
        return;
    }
    var request = new HTTPRequest("DELETE", "/combination-button-shortcut/entry");

    request.onVerify = function () {
        return this._request.status === 200;
    }

    request.onSuccess = function () {
        alert('정상적으로 삭제되었습니다');
        window.location.replace("/");
    };
    request.onError = function () {
        alert('삭제에 실패했습니다');
    };
    request.send("id=" + id);
}

function setQueryString(targetURL, queryStrings) {
    const url = new URL(targetURL);
    const urlSearchParams = new URLSearchParams(url.search);

    for (const [key, val] of Object.entries(queryStrings)) {
        if (!val) {
            continue;
        }
        urlSearchParams.set(key, val);
    }
    url.search = urlSearchParams.toString();
    return url.toString();
}

function getScrollY() {
    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
}


function openLoginPage(redirectURL = location.href) {
    function isMobile() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
        ];

        return toMatch.some(toMatchItem => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    const redirectURLWithRestoreScroll = setQueryString(redirectURL, {restoreScroll: getScrollY().toString()});
    const loginURL = createLoginURL(redirectURLWithRestoreScroll);
    const loginURLWithIsPopup = setQueryString(loginURL, {isPopup: 'true'});

    if (isMobile()) {
        window.open(loginURLWithIsPopup, '_self');
    } else {
        window.open(loginURLWithIsPopup, '_blank');
    }
}

function followBlog(blogId, $target, url, device) {
    if (!!initData.user) {
        var requestUrl = "/subscription/";

        return tjQuery.ajax({
            method: "POST",
            // dataType: "jsonp",
            url: requestUrl,
            data: {
                blogId: blogId,
                type: "follow",
                token: TistoryBlog.token,
                url: url,
                device: device
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function (r) {
            tjQuery(".btn_subscription").addClass("following");
            tjQuery(".btn_subscription .txt_post,.btn_subscription .txt_state").html('구독중');
            tjQuery(".btn_subscription").attr('data-tiara-copy', '구독중');
            showTooltip("이 블로그를 구독합니다.");
        }).fail(function (r) {
            showTooltip("구독 실패");
        }).always(function () {
            $target.data("doing", false);
        });
    } else {
        $target.data("doing", false);
        openLoginPage()
    }
}

function unfollowBlog(blogId, $target, url, device) {
    if (!!initData.user) {
        var requestUrl = "/subscription/";

        tjQuery.ajax({
            method: "POST",
            // dataType: "jsonp",
            url: requestUrl,
            data: {
                blogId: blogId,
                type: "unfollow",
                token: TistoryBlog.token,
                url: url,
                device: device
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function (r) {
            tjQuery(".btn_subscription").removeClass("following");
            tjQuery(".btn_subscription .txt_post,.btn_subscription .txt_state").html('구독하기');
            tjQuery(".btn_subscription").attr('data-tiara-copy', '구독하기');
            showTooltip("이 블로그 구독을 취소합니다.");
        }).fail(function (r) {
            showTooltip("구독 취소 실패");
        }).always(function () {
            $target.data("doing", false);
        });
    } else {
        $target.data("doing", false);
        openLoginPage()
    }
}

function reloadEntry(id) {
    var password = document.getElementById("entry" + id + "password");
    if (!password)
        return;

    var cookieKey = 'PROTECTED_PWD';
    var cookie = getCookie(cookieKey)
    if (cookie) {
        cookie = JSON.parse(atob(cookie));
    } else {
        cookie = {};
    }

    var urlKey = `${location.hostname}${location.pathname}`.replace(/\/+$/, '');
    var apiKey = `${location.hostname}/m/api/${id}`;
    cookie[urlKey] = encodeURIComponent(password.value)
    cookie[apiKey] = encodeURIComponent(password.value)

    document.cookie = cookieKey + "=" + btoa(JSON.stringify(cookie)) + ";path=/";

    window.location.reload();
}

function notBloggerNotice(oEvent) {
    if (confirm('아직 블로그를 개설하지 않으셨습니다 \n지금 개설 하시겠습니까?')) {
        document.location.href = T.config.JOIN_URL;
    }
    try {
        oEvent.preventDefault();
    } catch (e) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
}

function permissionNotice(oEvent) {
    if (T.config.USER.name == null || T.config.USER.homepage == null) {
        return false;
    }
    if (confirm(T.config.USER.name + '님의 블로그가 아닙니다. ' + T.config.USER.homepage + '의 관리자로 이동 하시겠습니까?')) {
        window.location.href = T.config.USER.homepage + '/manage';
    }
    try {
        oEvent.preventDefault();
    } catch (e) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
}

loadedComments = new Array();
loadedTrackbacks = new Array();

function viewTrigger(id, category, categoryId) {
    var request = new HTTPRequest("GET", "/" + category + "/view/" + id);
    var target = document.getElementById('entry' + id + (category == 'comment' ? 'Comment' : 'Trackback'));
    if (target == null)
        return false;
    request.onSuccess = function () {
        target.innerHTML = this.getText("/response/result");
        target.style.display = 'block';
        category == 'comment' ? loadedComments[id] = true : loadedTrackbacks[id] = true;
        if (categoryId > -1)
            location = location.toString();
        if (typeof window.needCommentCaptcha !== "undefined") {
            captchaPlugin.init();
        }
        findFragmentAndHighlight();
    };
    request.onError = function () {
        console.error('실패했습니다.')
    };
    request.send();
}

function highlight() {
    var hash = new RegExp("^#(comment\\d+)").exec(window.location.hash);
    if (hash && (el = document.getElementById(hash[1]))) {
        var highlightColor = el.getAttribute("activecommentbackground") || "#FFFF44";
        highlightElement(hash[1], 0, el.style.backgroundColor, highlightColor);
    }

}

function highlightElement(id, amount, origColor, highlightColor) {

    var el = document.getElementById(id);
    if (!el) {
        return;
    }

    el.style.backgroundColor = (amount % 2)
        ? highlightColor
        : origColor;

    if (++amount < 7) {
        setTimeout(function () {
            highlightElement(id, amount, origColor, highlightColor);
        }, 200);
    }
}

function toggleLayerForEntry(id, category, categoryId, mode) {
    if ((category == 'comment' ? loadedComments[id] : loadedTrackbacks[id])) {
        try {
            var obj = document.getElementById('entry' + id + (category == 'comment' ? 'Comment' : 'Trackback'));
            if (mode == undefined)
                obj.style.display = (obj.style.display == "none") ? "block" : "none";
            else
                obj.style.display = (mode == 'show') ? "block" : "none";
        } catch (e) {

        }
        return true;
    } else {
        if (categoryId) {
            viewTrigger(id, category, categoryId);
        } else {
            viewTrigger(id, category, -1);
        }
    }
}

function ObserverForAnchor(evetObj) {
    var lo = location.toString();
    var queryString = lo.substr(lo.lastIndexOf('/') + 1);
    if (queryString.indexOf('#') > -1) {
        var qsElements = queryString.split('#');
        if (qsElements[1].indexOf('comment') > -1) {
            var category = 'comment';
        } else if (qsElements[1].indexOf('trackback') > -1) {
            var category = 'trackback';
        }
        if (category) {
            entryid = qsElements[0];
            categoryId = qsElements[1].substr(category.length);
            toggleLayerForEntry(entryid, category, categoryId, 'show');
        }
    }
}

function removeQueryString(url, queryString) {
    url.searchParams.delete(queryString);
    history.replaceState(null, '', url);
}

function restoreScroll() {
    var RESTORE_SCROLL = 'restoreScroll';
    var url = new URL(location.href);
    var targetScrollHeightStr = url.searchParams.get(RESTORE_SCROLL);
    if (targetScrollHeightStr === null) return;

    var targetScrollHeight = Number(targetScrollHeightStr);
    if (isNaN(targetScrollHeight)) return;

    var rAF = -1;
    var CHECK_DURATION = 2000;

    function check() {
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;
        var maxScrollValue = scrollHeight - clientHeight;
        if (maxScrollValue >= targetScrollHeight) {
            removeQueryString(url, RESTORE_SCROLL)
            window.scrollTo(0, targetScrollHeight);
        } else {
            rAF = requestAnimationFrame(check);
        }
    };
    check();
    setTimeout(function () {
        cancelAnimationFrame(rAF);
        removeQueryString(url, RESTORE_SCROLL)
    }, CHECK_DURATION);
}

function openReportPageBasedOnQueryString() {
    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);
    const hasReportAction = searchParams.get('action') === 'report'

    if (!hasReportAction) {
        return;
    }
    removeQueryString(url, 'action')
    window.open(window.TistoryBlog.tistoryUrl + '/toolbar/popup/abuseReport/?entryId=' + window.T.entryInfo.entryId, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no');
}

STD.addEventListener(window);
window.addEventListener("load", ObserverForAnchor, false);
window.addEventListener("load", restoreScroll, false);
window.addEventListener("load", openReportPageBasedOnQueryString, false);

function toggleAdminLayer() {
    $('.btn_etc').click(function () {
        var $layer = $('.layer_edit');
        if ($(this).attr('aria-expanded') === 'true') {
            $(this).attr('aria-expanded', 'false');
            $layer.removeClass('layer_open');
        } else {
            $(this).attr('aria-expanded', 'true');
            $layer.addClass('layer_open');
        }
    })
}

toggleAdminLayer();

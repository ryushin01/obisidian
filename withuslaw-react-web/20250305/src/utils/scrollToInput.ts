export default function scrollToInput(e: any) {
  (e.target as any).scrollIntoView({ block: "center", behavior: "smooth" });
}

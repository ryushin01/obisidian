function includesFromObj(
  target: any[],
  key: string,
  arg: Record<string, any> | string
) {
  if (typeof arg === "string") {
    return target.some((e) => e[key] === arg);
  } else {
    return target.some((e) =>
      Object.entries(arg).every(([prop, value]) => e[prop] === value)
    );
  }
}

export { includesFromObj };

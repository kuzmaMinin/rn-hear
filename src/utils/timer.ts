export async function timer(ms: number) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log(ms, 'ms');
      resolve(true);
    }, ms),
  );
}

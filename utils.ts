export function replaceVariablesFromEnv(args: string[]) {
  args.forEach((el, index) => {
    if (process.env[`${el}`]) {
      process.argv[index] = process.env[`${el}`] as string;
    }
  });
}

export function removeVersionFlags(args: string[], argsVersionsList: string[]) {
  for (const arg of argsVersionsList) {
    const index = args.findIndex((el) => el === arg);
    if (index !== -1) args.splice(index, 2);
  }
}

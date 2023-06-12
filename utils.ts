export function replaceVariablesFromEnv(args:string[]){
    args.forEach((el, index) => {
      if(process.env[`${el}`]){
          process.argv[index] = process.env[`${el}`] as string
      }
  })
  }
  
export function removeVersionFlags(args:string[], argsVersionsList:string[]){
    for(let arg of argsVersionsList){   
      args.splice(
        args.findIndex((el) => el === arg),
        2,
      );
    }
  }
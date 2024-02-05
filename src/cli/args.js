const propertyPrefixFormat = '--';

const parseArgs = () => {
    const argsList = process.argv.slice(2);
    const result = [];

    argsList.forEach((arg, index) => {
        if(arg.startsWith(propertyPrefixFormat)) {
            result.push(`${arg.replace(propertyPrefixFormat, '')} is ${argsList[index + 1]}`);
        }
    });

    console.log(result.join(', '));
};

parseArgs();

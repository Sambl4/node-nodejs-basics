const prefix = 'RSS_';
const result = [];

const parseEnv = () => {
    const env = process.env;

    Object.keys(env).forEach(key => {
        if(key.startsWith(prefix)) {
            result.push(`${key}=${env[key]}`);
        }
    })
    console.log(result.join('; '));
};

parseEnv();

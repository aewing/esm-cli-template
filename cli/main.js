import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const {
	_: [command, ...args],
	...params
} = minimist(process.argv.slice(2));

try {
	const cmdPath = path.resolve('./cli/commands', `${command}.js`);
	if (fs.existsSync(cmdPath)) {
		import(cmdPath).then((mod) => mod.default(args, params));
	} else {
		console.log(`Command ${command} not found.`);
	}
} catch (e) {
	console.error(e);
}

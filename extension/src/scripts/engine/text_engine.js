import { sleep } from "../utils.js";

export class TextEngine {

    textIntroduction = async () => {
        console.log(
            `
          ____   ____   _    _____ __  _______  ____  _____  _____  ____ _____
         (_ (_´ / () \\ | |__|_   _|\\ \\/ /| () )| ===||_   _||_   _|| ===|| () )
        .__)__)/__/\\__\\|____| |_|   |__| |_()_)|____|  |_|    |_|  |____||_|\\_\\
        
           ` 
        )
        console.log('\n...\n');
        await sleep(500);
        console.log('hello, I am Morpheus and will be your salty better this session');
        console.log('...\n');
        await sleep(500);
        console.log('all you need to do is sit back and watch, I will bet for you');
        console.log('...\n');
        await sleep(500);
    }
}
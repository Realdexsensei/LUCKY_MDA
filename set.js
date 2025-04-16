const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURCMmtqRlFWNithd2NOd1R2UU10TzRSZUhQUklQWTRmbnI4UnA3UDBYcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGxuRVltUWNFRCtqci90Zk1vaGFpTTVNdjNuQjQydnJUSk9ub3c3b2EzRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzR0RTZkhQWDVyTFVPSjZydFNvM2R4azI3a1ZaU1RPZTZOTlRHOEpEN2tjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtZVpDYUhEalFMTndxM3I2TDNUVDBRZEZBbng1U2ZKcS9BYnJXL2FMcEh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHb3M1RzJTRnBsdnllT0NmRnZOY3pUYWEwY09WOE1mblc5eEwwcnRwM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlLbzFsOTU1SHlaeUVPa0xGUjBmcmtPV1oyZ0ZYLzhrbkFqS3VIVWRSRk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lETVZqVXNZVFZiZ1VTN3RzdTFyeU9qWkVjVUwzTWJtU0oxOEdETUpYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWNmN0ZRZEdUaWdIeDh5ZVhDc0NpRzBOOEp0a1BpV2x1SlRIcFJhVmoycz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllpVVQxMnJjVmFSN3dXdHlHUWRoQXRNV3Qwa0hobVhMV1dldkJaZTJ3Y0lVU1dRMUtTYXZuRDBEMlpCaG54ZWxLNmsrcWFFMk9mbFBPNndKVEQ4aUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJzSTZZUVhUVmJ4S3Q5L2IrU2YreVhsVHNWSUQwKzhWNnFWSXBaNGw3eWEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXbGtpem9TM1JqdWpNUk9zSEVzQlNRIiwicGhvbmVJZCI6IjcwZmIzOTBlLWUyMGItNGVjOS1hMzkwLTFiMjc3YmM4NzdmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaTG90bGY1UVRvUTdYMkFRcXdEQndzTHlPbjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT29OSGRUVjFRNXdEcXUzZDZpaDdBM1dsejdJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJQVkROSFczIiwibWUiOnsiaWQiOiI1MDk0Mzc2NjczNzo0NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJyZWFsZGV4c2Vuc2VpIHNob3AifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xIcXd1OEdFT0RNZ01BR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InBYSGtuN3ovNHpiYTcrSk5qMUlMaWVZVGxLMDVNYzJBNTRncWxQK2oyajA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJZb0lvM0ExamhNcmZkdGkxSXc4TWs3THhvSEhGNFdNbWdMZ0FXcU5QbFNaUzgrazZaTHRVR1BWQjdITGkrZElQWFNMTzVuWDZjT05lUWxaV09iZEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJVcXdKQWI3REhUK0RmTDIrVnl1MXdQT1JzbUF5emg1M3RmbjdXTlZWczZ0VENzSjZlNGVWdnBmQ2JTeVE2cTh3cXVhMDdDeC9RYkdFcVNYV2pyMU9Ddz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUwOTQzNzY2NzM3OjQ1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFWeDVKKzgvK00yMnUvaVRZOVNDNG5tRTVTdE9USE5nT2VJS3BUL285bzkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQ4NDAzMDIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRDNqIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


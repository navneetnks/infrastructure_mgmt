const keyValueDb = process.env.NOTES_DB;
const keyValueUser = process.env.NOTES_USER;
const keyValuePass = process.env.NOTES_PASSWORD;


// Use `print` for mongo shell logging (console.log is a Node.js method)
print(`Navneet INITIALIZING: Creating database user '${keyValueUser}' for database '${keyValueDb}'`);

if (!keyValueDb || !keyValueUser || !keyValuePass) {
  print(`Missing KEY_VALUE_* env vars. KEY_VALUE_DB=${keyValueDb}, KEY_VALUE_USER=${keyValueUser}`);
  throw new Error("Missing KEY_VALUE_* env vars");
}

db=db.getSiblingDB(keyValueDb);
db.createUser({
  user:keyValueUser,
  pwd:keyValuePass,
  roles:[
    { role: "readWrite", db: keyValueDb }
  ]
});

// Explicitly quit the shell to avoid leaving open connections that can race with the entrypoint shutdown
// (mongosh/mongo scripts usually support quit()). Use a non-error exit to indicate success.
try { quit(0); } catch (e) { /* some shells may not support quit() here, ignore */ }
// Simple local auth using SHA-256 hash (Web Crypto). Not production-grade.
export async function hashPassword(password){
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
}

export function saveUser(username, passHash){
  const users = JSON.parse(localStorage.getItem('dev_users')||'{}');
  users[username] = users[username] || { createdAt: Date.now() };
  users[username].hash = passHash;
  localStorage.setItem('dev_users', JSON.stringify(users));
}

export function verifyUser(username, passHash){
  const users = JSON.parse(localStorage.getItem('dev_users')||'{}');
  return users[username] && users[username].hash === passHash;
}

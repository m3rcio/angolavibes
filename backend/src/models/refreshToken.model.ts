import { db } from "../database/connection";

export async function saveRefreshToken(userId:string,token:string){
    const expiresAt= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
     await db.execute("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]);
}


export async function deleteRefreshToken(token:string){
    await db.execute("DELETE FROM refresh_tokens WHERE token = ?", [token])
}
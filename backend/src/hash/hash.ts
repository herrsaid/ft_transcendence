import * as bcrypt from 'bcrypt'

export async function hashPassword(password:string)
{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, 10);
}

export async function compare(password:string, hash:string) {
    return bcrypt.compare(password, hash);
}
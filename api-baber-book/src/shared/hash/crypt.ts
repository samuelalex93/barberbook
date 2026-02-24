
import bcrypt from "bcryptjs";

export async function cryptHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function compareHash(password: string, savedPassord: string) {
 return await bcrypt.compare(password, savedPassord);
}
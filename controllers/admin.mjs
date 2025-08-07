import Admin from '../models/adminModel.mjs';
import bcrypt from 'bcrypt';

async function seedAdmin() {
    const existing = await Admin.findOne();
    if (!existing) {
        const hashedPassword = await bcrypt.hash('adminpassword', 10);
        await Admin.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: hashedPassword,
        });
        console.log('Default admin created.');
    }
}
export default seedAdmin;




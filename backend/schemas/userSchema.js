const { z } = require("zod");

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at lease 3 characters").max(20),
    password: z.string().min(8, "Password must be at lease 8 characters"),
    role: z.enum( ["Admin", "Editor", "Confirmater", "user"], {
        errorMap: () => (
            {
                message: "Invalide role selected"
            }
        )
    } )
});

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

module.exports = { registerSchema, loginSchema };
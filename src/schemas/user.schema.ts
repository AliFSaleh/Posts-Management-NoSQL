import { object, string, TypeOf, z } from 'zod';

export const registerUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        email: string({
            required_error: 'Email is required'
        }),
        password: string({
            required_error: 'Password is required'
        })
        .min(3, 'Password must be more than 3 characters')
        .max(10, 'Password must be less than 10 characters'),
        passwordConfirm: string({
            required_error: 'Password confirm is required'
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});

export const loginSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }),
        password: string({
            required_error: 'Password is required'
        })
        .min(3, 'Password must be more than 3 characters')
        .max(10, 'Password must be less than 10 characters'),
    })
});

export const chargeAmountSchema = object({
    body: object({
        amount: z.number({
            required_error: 'Amount is required'
        })
        .min(1, 'Amount must be bigger than 1'),
    }),
})
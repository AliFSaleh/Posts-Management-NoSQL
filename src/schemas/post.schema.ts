import {object, string, z} from 'zod';

const params = {
    params: object({
      postId: string(),
    }),
};

export const createPostSchema = object({
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        content: string({
            required_error: 'Content is required'
        }),
        // thumbnail: string({
        //     required_error: 'Image is required'
        // }),
    })
})

export const getPostSchema = {
    ...params
}

export const updatePostSchema = object({
    ... params,
    body: object({
        title: string(),
        content: string(),
        image: string(),
    }).partial()
})

export const deletePostSchema = object({
    ...params,
});
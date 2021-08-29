import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user = { id: "6124e31d80801213e06d45e8" , role: "User",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjRlMzFkODA4MDEyMTNlMDZkNDVlOCIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjMwMjA0MTE4LCJleHAiOjE2MzAyMDQ4Mzh9.1QU29JZ8frnxN-Q-BA6ULKa6m6bKnnVbJV0P3ohuFLs"}
    return request.user;
  },
);
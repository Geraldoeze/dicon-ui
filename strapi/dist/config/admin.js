"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'cc4c4252f152530049f73f936c43a1a13a470170f74020ab2db755b306339001'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT', '8034f5837f9dfeaf2dcacd58b0404a0c26459c85c0a21d21431ad6f024353161'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
});

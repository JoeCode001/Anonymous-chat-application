<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie'
    ],

    'allowed_methods' => [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS', // Required for preflight requests
    ],

    'allowed_origins' => [
        'https://anonymous-chat-application-xi.vercel.app',
        'http://localhost:5173', // For local development
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-CSRF-TOKEN',
    ],

    'exposed_headers' => [
        'Authorization',
        'X-RateLimit-Limit',
        'X-RateLimit-Remaining',
    ],

    'max_age' => 86400, // 24 hours (preflight cache)

    'supports_credentials' => true, // Required for cookies/sessions
];
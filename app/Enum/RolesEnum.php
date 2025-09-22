<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case Commenter = 'commenter';
    case User = 'user';

    public static function labels(): array
    {
        return [
            Self::Admin->value => 'Admin',
            Self::Commenter->value => 'Commenter',
            Self::User->value => 'User',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::User => 'User',
            self::Commenter => 'Commenter',
        };
    }
}

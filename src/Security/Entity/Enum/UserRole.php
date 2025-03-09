<?php

namespace App\Security\Entity\Enum;

enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';
}

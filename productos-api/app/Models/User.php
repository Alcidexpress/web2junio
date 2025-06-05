<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    // Aquí van las propiedades protegidas si las tienes, por ejemplo:
    // protected $fillable = ['name', 'email', 'password'];

    /**
     * Obtiene el identificador que se almacenará en el JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Retorna un array con las reclamaciones personalizadas que se agregarán al JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}


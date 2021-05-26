import { MinLength } from "class-validator"

export class LoginBody {
  @MinLength(2)
  id: string

  @MinLength(4)
  pass: string
}

import {
  IsEmail,
  IsInt,
  IsOptional,
  Length,
  Matches,
  Max,
  Min,
} from "class-validator"

export class SessionCreateBody {
  @Length(3, 20)
  @Matches(/^\w*$/)
  userName: string

  @Length(12, 60)
  @Matches(/^[\u{20}-\u{7e}]*$/u) // ASCIIの印字可能文字 (含 space)
  userPassphrase: string
}

export class UserIndexQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number

  @IsOptional()
  @Matches(/^c[0-9a-z]+$/, { each: true })
  userIds?: string[]

  @IsOptional()
  @Length(3, 20, { each: true })
  userNames?: string[]
}

export class UserCreateBody {
  @Length(3, 20)
  @Matches(/^\w*$/)
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @Length(1, 20)
  displayName?: string

  @Length(12, 60)
  @Matches(/^[\u{20}-\u{7e}]*$/u) // ASCIIの印字可能文字 (含 space)
  passphrase: string

  @Length(0, 300)
  profile: string
}

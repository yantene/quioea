import { Timestamp, UserInfo, UserInfoFull, Passphrase, Cuid } from "$/types"
import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

/**
 * ユーザを検証する。
 * @param name ユーザ名。
 * @param passphrase パスフレーズ。
 * @returns 検証に成功したら true。
 */
export const validateUser = async (user: User, passphrase: string) =>
  await bcrypt.compare(passphrase, user.hashedPassphrase)

/**
 * ユーザを作成する。
 * @param userParam ユーザ作成時に必要な情報。
 * @returns 作成された User オブジェクト。
 */
export const createUser = async (
  userParam: UserInfoFull & Passphrase,
): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name: userParam.name,
      email: userParam.email,
      displayName: userParam.displayName,
      hashedPassphrase: await bcrypt.hash(userParam.passphrase, 10),
      profile: userParam.profile,
    },
  })

  return user
}

/**
 * ユーザをページネーションしながら取得する。
 * userIds または userNames の少なくとも一方が与えられている場合、そのユーザらを返す。
 * userIds と userNames のいずれも与えられていない場合、すべてのユーザらを返す。
 * @param userIds ユーザIDの配列。
 * @param userNames ユーザ名の配列。
 * @param limit 取得件数。
 * @param offset 取得位置のオフセット。
 * @returns ページネーションされた User オブジェクトの配列。
 */
export const getUsers = async (
  cond?: {
    userIds?: string[]
    userNames?: string[]
  },
  limit = 25,
  offset = 0,
) =>
  prisma.user.findMany({
    where: {
      ...(cond?.userIds || cond?.userNames
        ? {
            OR: [
              { id: { in: cond?.userIds } },
              { name: { in: cond?.userNames } },
            ],
          }
        : {}),
    },
    skip: offset,
    take: limit,
    orderBy: { createdAt: "asc" },
  })

/**
 * User オブジェクトから UserInfo オブジェクトを作る。
 * 不要なプロパティは削除する。
 * @param user User オブジェクト。
 * @returns UserInfo オブジェクト。
 */
export const toUserInfo = (user: User): Cuid & UserInfo & Timestamp => ({
  id: user.id,
  name: user.name,
  displayName: user.displayName ?? user.name,
  profile: user.profile,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

/**
 * User オブジェクトから UserInfoFull オブジェクトを作る。
 * @param user User オブジェクト。
 * @returns UserFullInfo オブジェクト。
 */
export const toUserInfoFull = (user: User): Cuid & UserInfoFull & Timestamp =>
  Object.assign(
    {
      email: user.email,
    },
    toUserInfo(user),
  )

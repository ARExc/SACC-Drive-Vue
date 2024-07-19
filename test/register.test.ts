import {expect, test} from "vitest";
import {register} from "../src/api/user/register";

test("测试注册", async () => {

  expect(await register({
    username: "test",
    password: "test",
    nickname: "test"
  })).toBe("注册成功");
})

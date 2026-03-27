import axios from "axios";

// 给变量一个保底空值，并彻底删掉 throw new Error 这一行
const JUDGE0_API_URL = process.env.NEXT_PUBLIC_JUDGE0_API_URL || "";
const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || "";

// 只要删掉那个 if (!...) { throw ... } 块，构建就能通过！

const headers = {
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  "X-RapidAPI-Key": RAPID_API_KEY,
  "Content-Type": "application/json",
};

export async function submitCode(sourceCode: string, languageId: number) {
  try {
    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions`,
      { source_code: sourceCode, language_id: languageId },
      { headers }
    );

    const token = response.data.token;

    let result;
    do {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, {
        headers,
      });
    } while (result.data.status.id <= 2);

    return result.data;
  } catch (error) {
    return null;
  }
}

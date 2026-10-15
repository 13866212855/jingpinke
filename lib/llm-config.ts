/**
 * myusellm 统一大模型配置参数 (apihub)
 */
export const LLM_CONFIG = {
  baseURL: process.env.OPENAI_API_BASE || "https://apihub.agnes-ai.com/v1",
  apiKey: process.env.OPENAI_API_KEY || "sk-GUdpKQNIwwJSZQ5mYyrMnuCJBOwSbB73c2N6NcnNfk5LoKyq",
  defaultModel: "gemini-2.5-flash",
};

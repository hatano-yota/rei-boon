import axios, { AxiosError } from 'axios';

interface apiReturn {
  content: string;
}

interface apiProps {
  apiKey: string;
  wordName: string;
  wordLang: string;
  wordMean: string;
}

/**
 * Axiosエラーか判定
 * @param error
 * @returns
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
	return (error as AxiosError)?.isAxiosError === true;
};
/**
 * README作成関数
 * @param content
 * @param model
 * @param role
 * @returns
 */
export const generateExample = async (props: apiProps) => {
	const { apiKey, wordName, wordMean, wordLang } = props;
	try {
		const res = await axios.post<apiReturn>(
			'https://ray-boon-api.vercel.app/api',
			{
				apiKey: apiKey,
				wordName: wordName,
				wordLang: wordLang,
				wordMean: wordMean,
			}
		);

		return { success: true, content: res.data.content };
	} catch (error) {
		console.log(error);
		if (isAxiosError(error) && error?.response?.status === 403) {
			// 通信失敗時
			return {
				success: false,
				content: 'An error occurred during the request. Please try again.',
			};
		} else if (
			isAxiosError(error) &&
      // @ts-ignore
      error.response?.data.error.code === 'context_length_exceeded'
		) {
			// トークン不足時
			return {
				success: false,
				content:
          'An error occurred during the request. The file size is too large. Please choose another file or format the code in the file.',
			};
		} else {
			// APIキーが違うなど
			return {
				success: false,
				content:
          'An error occurred during the request. Please check your API key and model',
			};
		}
	}
};

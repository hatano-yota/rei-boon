import { atom } from 'recoil';

export const APIKeyState = atom<string>({
	key: 'APIKeyState',
	default: ''
});
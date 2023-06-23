import { atom } from 'recoil';

export interface PopoverDef {
    currentId: number,
    visible: boolean
}

export const PopoverState = atom<PopoverDef>({
	key: 'PopoverState',
	default: {
		currentId: -1,
		visible: false
	}
});
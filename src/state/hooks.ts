import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {SongSuggestionState} from "./song-suggestion.slice";
import {AppDispatch} from "./store";
import {Theme, theme} from "../configurations/theme/theme";

export const useAppSelector: TypedUseSelectorHook<SongSuggestionState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTheme: { colours: { secondary: string; text_primary: string; background: string; primary: string } } = theme;
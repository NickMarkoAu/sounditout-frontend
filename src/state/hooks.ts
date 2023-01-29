import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {SongSuggestionState} from "./song-suggestion.slice";

export const useAppSelector: TypedUseSelectorHook<SongSuggestionState> = useSelector;

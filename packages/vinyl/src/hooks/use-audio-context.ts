import { useRef } from '@wordpress/element';

export function useAudioContext(): AudioContext {
	const audioContextRef = useRef< AudioContext | null >( null );

	const getAudioContext = (): AudioContext => {
		if ( audioContextRef.current ) {
			return audioContextRef.current;
		}
		const audioContext = new AudioContext();
		audioContextRef.current = audioContext;
		return audioContext;
	};

	return getAudioContext();
}

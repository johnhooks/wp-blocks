export interface State {
	/**
	 * Boolean of whether or not the audio is playing.
	 */
	isPlaying: boolean;

	/**
	 * Position of the playhead in the timeline of playback.
	 */
	playheadPosition: number;

	/**
	 * The length of audio source in milliseconds.
	 */
	sourceDuration: number;
}

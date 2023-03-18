import { useRef } from '@wordpress/element';
import {
	mergeProps,
	useSliderThumb,
	VisuallyHidden,
	type FocusProps,
} from 'react-aria';
import type { SliderState } from 'react-state';

interface Props {
	/**
	 * Normalized position of the playhead.
	 *
	 * Value between 0 and 1
	 */
	position?: number;

	/**
	 * Playhead drag start event handler.
	 */
	onDragStart?: () => void;

	/**
	 * Props from parent's `useFocusRing`
	 */
	focusProps: FocusProps;

	/**
	 * TODO undocumented
	 */
	isFocusVisible: boolean;

	/**
	 *
	 */
	index: number;
}

export function Playhead( props: Props ) {
	const { state, trackRef, focusProps, isFocusVisible, index } = props;
	const inputRef = useRef( null );
	const { thumbProps, inputProps } = useSliderThumb(
		{ index, trackRef, inputRef },
		state
	);

	return (
		<div
			className="wp-block-vinyl__playhead"
			style={ {
				left: `${ state.getThumbPercent( index ) * 100 }%`,
			} }
		>
			<div
				role="slider"
				tabIndex={ 0 }
				{ ...thumbProps }
				onMouseDown={ ( ...args ) => {
					thumbProps.onMouseDown?.( ...args );
					props.onDragStart?.();
				} }
				onPointerDown={ ( ...args ) => {
					thumbProps.onPointerDown?.( ...args );
					props.onDragStart?.();
				} }
				className={
					isFocusVisible || state.isThumbDragging( index )
						? 'wp-block-vinyl__playhead-active'
						: 'wp-block-vinyl__playhead-inactive'
				}
			>
				<VisuallyHidden>
					<input
						ref={ inputRef }
						{ ...mergeProps( inputProps, focusProps ) }
					/>
				</VisuallyHidden>
			</div>
		</div>
	);
}

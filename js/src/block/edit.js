/**
 * WordPress dependencies
 */
const { serverSideRender: ServerSideRender } = wp;
import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { blockName } from './constants';

const Edit = ( props ) => {
	const { isSelected, setAttributes } = props;
	const { text } = props.attributes;

	return (
		isSelected ? (
			<TextareaControl
				label={ __( 'Enter a long string, then click outside this block to see the ServerSideRender', 'ssr-demo' ) }
				value={ text }
				onChange={ ( newText ) => {
					setAttributes( { text: newText } );
				} }
			/>
		) : (
			<>
				{ __( 'Below is the ServerSideRender component, it should display the same text you entered, without an error:', 'ssr-demo' ) }
				<ServerSideRender
					block={ blockName }
					attributes={ props.attributes }
					requestBody={ true }
				/>
			</>
		)
	);
};

export default Edit;

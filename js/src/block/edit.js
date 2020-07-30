/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
const { serverSideRender: ServerSideRender } = wp;
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, ToggleControl } from '@wordpress/components';
import { sprintf, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { blockName } from './constants';

const Edit = ( { attributes: { text, useRequestBody }, isSelected, setAttributes } ) => {
	const httpMethod = useRequestBody ? 'POST' : 'GET';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'SSR Settings', 'ssr-demo' ) }>
					<ToggleControl
						checked={ useRequestBody }
						label={ sprintf( __( 'Use %s prop', 'ssr-demo' ), 'requestBody' ) }
						onChange={ () => setAttributes( { useRequestBody: ! useRequestBody } ) }
						nonExistent={ true }
					>
					</ToggleControl>
				</PanelBody>
			</InspectorControls>
			{ isSelected ? (
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
						attributes={ { text } }
						httpMethod={ httpMethod }
					/>
				</>
			) }
		</>
	);
};

Edit.propTypes = {
	attributes: PropTypes.shape( {
		text: PropTypes.string,
		useRequestBody: PropTypes.bool,
	} ),
	setAttributes: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default Edit;

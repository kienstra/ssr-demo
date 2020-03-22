/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import Edit from './edit';
import { blockName } from './constants';

/**
 * Registers the AR Viewer block.
 */
registerBlockType( blockName, {
	title: __( 'SSR Demo', 'ssr-demo' ),
	description: __( 'A demo of ServerSideRender', 'ssr-demo' ),
	category: 'common',
	attributes: {
		text: {
			type: 'string',
		},
		useRequestBody: {
			type: 'boolean',
			default: true,
		},
	},
	edit: Edit,
	save() {
		return null;
	},
} );

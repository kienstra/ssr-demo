<?php
/**
 * Tests for class Block.
 *
 * @package SsrDemo
 */

namespace SsrDemo;

use WP_Mock;
use Mockery;

/**
 * Tests for class Block.
 */
class TestBlock extends TestCase {

	/**
	 * Instance of Block.
	 *
	 * @var Block
	 */
	public $instance;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() : void {
		parent::setUp();
		$plugin = new Plugin( dirname( dirname( __FILE__ ) ) );
		$plugin->init();
		$this->instance = new Block( $plugin );
	}

	/**
	 * Test __construct().
	 *
	 * @covers \SsrDemo\Block::__construct()
	 */
	public function test_construct() {
		$this->assertEquals( __NAMESPACE__ . '\\Plugin', get_class( $this->instance->plugin ) );
	}

	/**
	 * Test init().
	 *
	 * @covers \SsrDemo\Block::init()
	 */
	public function test_init() {
		WP_Mock::expectActionAdded( 'init', [ $this->instance, 'register_block' ] );
		$this->instance->init();
	}

	/**
	 * Test register_block.
	 *
	 * @covers \SsrDemo\Block::register_block()
	 */
	public function test_register_block() {
		WP_Mock::userFunction( 'register_block_type' )
			->once()
			->with( Block::BLOCK_NAME, Mockery::type( 'array' ) );

		$this->instance->register_block();
	}

	/**
	 * Gets the test data for test_render_block().
	 *
	 * @return array The test data.
	 */
	public function get_render_block_data() {
		$text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
		return [
			'no_attribute' => [
				[],
				'',
			],
			'empty_text'   => [
				[ 'text' => '' ],
				'',
			],
			'text_exists'  => [
				compact( 'text' ),
				$text,
			],
		];
	}

	/**
	 * Test render_block.
	 *
	 * @dataProvider get_render_block_data
	 * @covers \SsrDemo\Block::render_block()
	 *
	 * @param array       $attributes The block attributes.
	 * @param string|null $expected   The expected return value.
	 */
	public function test_render_block( $attributes, $expected ) {
		$this->assertEquals(
			$expected,
			trim( $this->instance->render_block( $attributes ) ),
		);
	}
}

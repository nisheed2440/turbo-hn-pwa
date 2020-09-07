import { Controller } from 'stimulus';
import axios from 'axios';

export default class extends Controller {
    addToCart = (e) => {
        const sku = $(e.target).data('sku');
        axios.post(`${process.env.BASE_URL}/add-to-cart`, {
            sku,
        }).then((res) => {
            $('#mini-cart-count').text(res.data.count);
        });
    }

	connect() {
		$('.add-to-cart-btn').on('click', this.addToCart);
    }
    disconnect() {
        $('.add-to-cart-btn').off('click', this.addToCart);
    }
}

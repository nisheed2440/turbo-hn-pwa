import { Controller } from 'stimulus';
import axios from 'axios';

export default class extends Controller {
    removeItem = (e) => {
        const sku = $(e.target).data('sku');
        axios.post(`${process.env.BASE_URL}/add-to-cart`, {
            sku,
            type: 'remove',
        }).then((res) => {
            $('#mini-cart-count').text(res.data.count);
            window.Turbolinks.visit('/cart');
        });
    }

	connect() {
		$('.remove-item-cart-btn').on('click', this.removeItem);
    }
    disconnect() {
        $('.remove-item-cart-btn').off('click', this.removeItem);
    }
}

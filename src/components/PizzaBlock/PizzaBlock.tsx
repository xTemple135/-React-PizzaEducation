import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, addItem, selectCartItem } from '../../redux/slices/CartSlice';
import { Link } from 'react-router-dom';
const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
	id: string;
	title: string;
	price: number;
	sizes: number[];
	types: number[];
	imageUrl: string;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	title,
	price,
	sizes,
	types,
	imageUrl
}) => {
	const [activeType, setActiveType] = useState(0);
	const [activeSizes, setActiveSizes] = useState(0);
	const item = useSelector(selectCartItem(id));
	const count = item ? item.count : 0;
	const dispatch = useDispatch();

	const onClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const item:CartItem = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSizes],
			count: 0
		};
		dispatch(addItem(item));
	};
	return (
		<div className="pizza-block">
			<Link to={`/pizza/${id}`} >
			<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
			<h4 className="pizza-block__title">{title}</h4>
			</Link>
			<div className="pizza-block__selector">
				<ul>
					{types.map(index => (
						<li
							key={index}
							className={activeType === index ? 'active' : ''}
							onClick={() => setActiveType(index)}
						>
							{typeNames[index]}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, i) => (
						<li
							key={i}
							className={activeSizes === i ? 'active' : ''}
							onClick={() => setActiveSizes(i)}
						>
							{size}
						</li>
					))}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<button
					className="button button--outline button--add"
					onClick={onClickAdd}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{count > 0 && <i>{count}</i>}
				</button>
			</div>
		</div>
	);
};

export default PizzaBlock;

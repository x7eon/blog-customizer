import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	handleClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const classNameArrowButton = clsx(styles.container, {
		[styles.container_open]: props.isOpen,
	});
	const classNameArrowImage = clsx(styles.arrow, {
		[styles.arrow_open]: props.isOpen,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNameArrowButton}
			onClick={props.handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={classNameArrowImage} />
		</div>
	);
};

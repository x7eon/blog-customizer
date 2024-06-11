import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { Text } from 'components/text';
import { Select } from '../select/Select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator/Separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import clsx from 'clsx';

type ArticleParamsFormProps = {
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLElement>(null);
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = (value: boolean) => {
		setIsOpen(value);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: handleClose,
	});

	const classNameAside = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const newArticleState: ArticleStateType = {
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
		};
		setArticleState(newArticleState);
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton handleClick={handleClick} isOpen={isOpen} />
			<aside className={classNameAside} ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<>
						<Text as={'h2'} size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>

						<label>
							<Select
								selected={selectedFont}
								options={fontFamilyOptions}
								onChange={setSelectedFont}
								title={'Шрифт'}></Select>
						</label>

						<label>
							<RadioGroup
								name={'radio'}
								options={fontSizeOptions}
								selected={selectedFontSize}
								onChange={setSelectedFontSize}
								title={'Размер шрифта'}></RadioGroup>
						</label>

						<label>
							<Select
								selected={selectedFontColor}
								options={fontColors}
								onChange={setSelectedFontColor}
								title={'Цвет шрифта'}></Select>
						</label>

						<Separator></Separator>

						<label>
							<Select
								selected={selectedBgColor}
								options={backgroundColors}
								onChange={setSelectedBgColor}
								title={'Цвет фона'}></Select>
						</label>

						<label>
							<Select
								selected={selectedContentWidth}
								options={contentWidthArr}
								onChange={setSelectedContentWidth}
								title={'Ширина контента'}></Select>
						</label>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleReset} />
							<Button title='Применить' type='submit' />
						</div>
					</>
				</form>
			</aside>
		</>
	);
};

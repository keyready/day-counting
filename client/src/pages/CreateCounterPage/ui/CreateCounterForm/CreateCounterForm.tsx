import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Nullable } from 'primereact/ts-helpers';
import { Calendar } from 'primereact/calendar';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { FileUploadHeaderTemplateOptions, FileUploadSelectEvent } from 'primereact/fileupload';
import { Button } from 'shared/UI/Button';
import { Counter } from 'entities/Counter';
import classes from './CreateCounterForm.module.scss';

interface CreateCounterFormProps {
    className?: string;
    onCreate: (data: Partial<Counter>) => void;
}

export const CreateCounterForm = memo((props: CreateCounterFormProps) => {
    const { className, onCreate } = props;

    const [title, setTitle] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(true);
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [image, setImage] = useState<File>({} as File);

    const handleCreateCounterSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (date) {
                onCreate({
                    date: new Date(date),
                    isPrivate,
                    title,
                });
            }
        },
        [date, isPrivate, onCreate, title],
    );

    const handleOnFileSelect = useCallback((event: FileUploadSelectEvent) => {
        setImage(event.files[0]);
    }, []);

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;

        return (
            <div className={className}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    };

    return (
        <form onSubmit={handleCreateCounterSubmit}>
            <VStack gap="8" maxW className={classNames(classes.CreateCounterForm, {}, [className])}>
                <Input
                    name="title"
                    placeholder="Придумай название"
                    value={title}
                    onChange={setTitle}
                    required
                    autoFocus
                />
                <Calendar
                    style={{ width: '100%' }}
                    dateFormat="dd.mm.yy DD"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    required
                    showTime
                />

                {/* <FileUpload */}
                {/*    disabled */}
                {/*    style={{ width: '100%' }} */}
                {/*    name="picture" */}
                {/*    url="/api/upload" */}
                {/*    accept="image/*" */}
                {/*    maxFileSize={Infinity} */}
                {/*    emptyTemplate={ */}
                {/*        <Text */}
                {/*            // text="Выбери картинку, которая будет отображаться рядом со счетчиком" */}
                {/*            text="Пока не работает, но сделаю ;)" */}
                {/*            align="center" */}
                {/*        /> */}
                {/*    } */}
                {/*    chooseLabel="Выбери картинку" */}
                {/*    uploadLabel="" */}
                {/*    onSelect={handleOnFileSelect} */}
                {/*    cancelLabel="Отменить" */}
                {/*    headerTemplate={headerTemplate} */}
                {/* /> */}

                <ToggleButton
                    checked={isPrivate}
                    onChange={(e: ToggleButtonChangeEvent) => setIsPrivate(e.value)}
                    className="w-8rem"
                    onLabel="Только для меня"
                    offLabel="Для всех"
                />

                <Button type="submit">Создать</Button>
            </VStack>
        </form>
    );
});

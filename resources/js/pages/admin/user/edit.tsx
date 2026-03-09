import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import users from '@/routes/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
];

type UserForm = {
    name: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
};

export default function UserEdit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm<UserForm>({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        status: user.status,
    });

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        put(users.update(user.id).url);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <form onSubmit={submit}>
                            <FieldSet>
                                <FieldLegend>Edit User</FieldLegend>
                                <FieldDescription>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Sed, voluptate esse
                                    explicabo numquam blanditiis perspiciatis
                                    eos est neque iure nisi voluptatibus
                                    doloribus ut nobis, eum natus a nihil sint
                                    officia?
                                </FieldDescription>
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        Nama Lengkap
                                    </FieldLabel>
                                    <Input
                                        id="name"
                                        type="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        autoComplete="off"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            autoComplete="off"
                                            placeholder="example@example.com"
                                        />
                                        {errors.email && (
                                            <FieldError>
                                                {errors.email}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            autoComplete="off"
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && (
                                            <FieldError>
                                                {errors.password}
                                            </FieldError>
                                        )}
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="role">Role</FieldLabel>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) =>
                                            setData('role', value)
                                        }
                                        defaultValue={data.role}
                                    >
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="admin">
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value="user">
                                                    User
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <FieldError>{errors.role}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="status">
                                        Status
                                    </FieldLabel>
                                    <Select
                                        value={String(data.status)}
                                        onValueChange={(value) =>
                                            setData('role', value)
                                        }
                                        defaultValue={String(data.status)}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="true">
                                                    Aktif
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    Tidak Aktif
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-white"
                                >
                                    <Save className="size-5" /> Simpan
                                </Button>
                            </FieldSet>
                        </form>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}

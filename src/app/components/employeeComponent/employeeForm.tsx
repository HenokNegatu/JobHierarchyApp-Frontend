import { employeeAPI, useAddEmployeeMutation, useEditEmployeeMutation } from '@/app/store/apiEmployee';
import { Employee, GenderType, MaritalStatusType, RequestType, Role, StatusType } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Fieldset, Loader, NumberInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import z from 'zod'
import PhoneNumber from './phone-input';
import { useEffect } from 'react';



const EmployeeSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    dateOfBirth: z.date().optional(),
    hireDate: z.date(),
    salary: z.number().optional(),
    address: z.string().optional(),
    gender: z.nativeEnum(GenderType),
    maritalStatus: z.nativeEnum(MaritalStatusType).optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    nationalId: z.string().optional(),
    profilePictureUrl: z.string().optional(),
    role: z.nativeEnum(Role),
    position: z.string()
});

type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;

type EmployeeFormProp = { positionId?: string, action: RequestType, employee?: Employee }


export default function EmployeeForm({ positionId, action, employee }: EmployeeFormProp) {

    const [addEmployee, { isLoading: isAdding, error: addError }] = useAddEmployeeMutation();
    const [editEmployee, { isLoading: isEditing, error: editError }] = useEditEmployeeMutation();


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control
    } = useForm<EmployeeSchemaType>({
        resolver: zodResolver(EmployeeSchema),
    });

    useEffect(() => {
        if (action === "PUT") {
            reset({
                firstName: employee?.firstName,
                lastName: employee?.lastName,
                email: employee?.email,
                phoneNumber: employee?.phoneNumber,
                dateOfBirth: employee?.dateOfBirth ? new Date(employee?.dateOfBirth) : undefined,
                hireDate: employee?.hireDate ? new Date(employee?.hireDate) : undefined,
                salary: Number(employee?.salary) || undefined,
                address: employee?.address,
                gender: employee?.gender,
                maritalStatus: employee?.maritalStatus,
                emergencyContactName: employee?.emergencyContactName,
                emergencyContactNumber: employee?.emergencyContactNumber,
                nationalId: employee?.nationalId,
                profilePictureUrl: employee?.profilePictureUrl,
                role: employee?.role,
                position: employee?.position?.id
            })
            console.log(typeof(employee?.salary))
        } else {
            reset()
        }
    }, [employee, action])
    const onSubmit: SubmitHandler<EmployeeSchemaType> = async (data) => {

    console.log(data)        
        data.firstName = data.firstName.toLowerCase()
        data.lastName = data.lastName.toLowerCase()
        data.emergencyContactName = data.emergencyContactName?.toLowerCase()
        
        if (action === "POST") {
            await addEmployee(data)
        }
        else {
            console.log(data.salary)
            await editEmployee({ employeeId: employee?.id, editedEmployee: data })
        }

        if (addError) {
            let errorMsg = 'An unknown error occurred'

            if ('status' in addError) {
                if (addError?.status === 409) {
                    errorMsg = "An employee with this email or national ID already exists.";
                }
            }
            console.error(errorMsg, addError)
            return notifications.show({
                title: 'Error',
                message: `${errorMsg} Please try again.`,
                color: 'red',
            });
        }

        if (editError) {
            let errorMsg = 'An unknown error occurred'

            if ('status' in editError) {
                if (editError?.status === 409) {
                    errorMsg = "An employee with this email or national ID already exists.";
                }
            }
            console.log(errorMsg)
            return notifications.show({
                title: 'Error',
                message: `${errorMsg} Please try again.`,
                color: 'red',
            });
        }
        else if(!editError && !addError){
            notifications.show({
                title: `${action === "POST" ? "Register" : "Edit"} Employee`,
                message: `Employee ${action === "POST" ? "registered" : "edited"}! 🌟`,
            })
        }

        reset()
        
    };

    return (
        <Fieldset legend={action === "POST" ?
            "Register new Employee" :
            "Make changes to the Employee info here"
        } className='w-[70vw]'>
            <form className='grid grid-cols-2 gap-5 w-full justify-center' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-3/4'>
                    <div className='flex gap-2'>
                        <TextInput label="First Name" placeholder="Employee firstname" {...register('firstName')} error={errors.firstName?.message} />
                        <TextInput label="Last Name" placeholder="Employee lastname" {...register('lastName')} error={errors.lastName?.message} />
                    </div>
                    <TextInput label="Email" placeholder="Email" mt="md" {...register('email')} error={errors.email?.message} />

                    <Controller
                        control={control}
                        name="phoneNumber"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (
                            <PhoneNumber label="Phone number " name={name} onChange={onChange} value={value} error={errors.phoneNumber?.message} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="gender"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (
                            <Select
                                label="Gender"
                                name={name}
                                value={value}
                                placeholder="Pick a gender"
                                data={["Male", "Female"]}
                                onChange={onChange}
                                error={errors.gender?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <DateInput valueFormat="YYYY MMM DD" name={name} label="date of Birth" placeholder="Date input" onChange={onChange}
                                value={value ?? undefined} error={errors.dateOfBirth?.message} />
                        )}
                    />
                    <TextInput label="Adress" placeholder="Street Address, City, Country" {...register("address")} error={errors.address?.message} />
                    <Controller
                        control={control}
                        name="hireDate"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <DateInput valueFormat="YYYY MMM DD" label="hire date" placeholder="Date input" name={name} onChange={onChange}
                                value={value ?? undefined} error={errors.hireDate?.message} />
                        )}
                    />
                </div>

                <div className='w-3/4'>

                    <Controller
                        control={control}
                        name="salary"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <NumberInput
                                name={name}
                                label="Salary"
                                placeholder="salary"
                                onChange={onChange}
                                value={value ?? undefined}
                                error={errors.dateOfBirth?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="maritalStatus"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <Select
                                label="Marital status"
                                name={name}
                                value={value}
                                placeholder="Pick value"
                                data={["Single", "Married", "Divorced", "Widowed"]}
                                onChange={onChange}
                                error={errors.dateOfBirth?.message}
                            />
                        )}
                    />
                    <TextInput label="Emergency Contact Name" placeholder="" {...register("emergencyContactName")} error={errors.emergencyContactName?.message} />
                    <Controller
                        control={control}
                        name="emergencyContactNumber"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (
                            <PhoneNumber label="Emergency contact number" name={name} onChange={onChange} value={value} error={errors.emergencyContactNumber?.message} />
                        )}
                    />
                    <TextInput label="National Id" placeholder="" {...register("nationalId")} error={errors.nationalId?.message} />
                    <TextInput label="Profile Picture Url" placeholder="" {...register("profilePictureUrl")} error={errors.profilePictureUrl?.message} />
                    <Controller
                        control={control}
                        name="role"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (
                            <Select
                                label="Role"
                                name={name}
                                value={value}
                                placeholder="Pick a role"
                                data={["admin", "non-admin"]}
                                onChange={onChange}
                                error={errors.role?.message}
                            />
                        )}
                    />
                    <TextInput placeholder="" {...register("position")} value={positionId} hidden />
                </div>
                {(isAdding || isEditing) ? <Loader size={30} className='col-span-2 w-2/4 justify-self-center' /> : <Button type="submit" className='col-span-2 w-2/4 justify-self-center'>{action === "PUT" ? "Edit" : "Add"}</Button>}
            </form>
        </Fieldset>
    )
}
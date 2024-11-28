import { Avatar, Divider  } from "@mantine/core";
import dayjs from 'dayjs';
import { Phone, Home, Briefcase, Contact, User, Mail } from 'lucide-react'
import { Employee, StatusType } from "@/app/types";

export default function Profile({ employeeInfo }: { employeeInfo: Employee }) {
    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case StatusType.Active:
                return 'bg-green-500'
            case StatusType.Inactive:
                return 'bg-red-500'
            case StatusType.OnLeave:
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }

    const formattedSalary = employeeInfo.salary
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(employeeInfo.salary)
        : 'Not specified'

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                        <Avatar className="h-14 w-14 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            {employeeInfo.firstName} {employeeInfo.lastName}
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg text-muted-foreground">{employeeInfo.title}</span>
                            <div className="flex items-center gap-2 ml-4">
                                <div
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusColor(
                                        employeeInfo.status
                                    )}`}
                                />
                                <span className="text-sm font-medium">{employeeInfo.status.replace('_', ' ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Personal Information */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                            <User className="h-5 w-5" />
                            Personal Information
                        </h2>
                        <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Gender</p>
                                <p className="font-medium mt-1">{employeeInfo.gender}</p>
                            </div>
                            {employeeInfo.dateOfBirth && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                                    <p className="font-medium mt-1">{dayjs(employeeInfo.dateOfBirth).format('DD/MM/YYYY')}</p>
                                </div>
                            )}
                            {employeeInfo.maritalStatus && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Marital Status</p>
                                    <p className="font-medium mt-1">{employeeInfo.maritalStatus.replace('_', ' ')}</p>
                                </div>
                            )}
                            {employeeInfo.nationalId && (
                                <div>
                                    <p className="text-sm text-muted-foreground">National ID</p>
                                    <p className="font-medium mt-1">{employeeInfo.nationalId}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Middle Column - Contact Information */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                            <Contact className="h-5 w-5" />
                            Contact Information
                        </h2>
                        <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p>{employeeInfo.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p>{employeeInfo.phoneNumber}</p>
                                </div>
                                {employeeInfo.address && (
                                    <div className="flex items-center gap-2">
                                        <Home className="h-4 w-4 text-muted-foreground" />
                                        <p>{employeeInfo.address}</p>
                                    </div>
                                )}
                            </div>

                            {(employeeInfo.emergencyContactName || employeeInfo.emergencyContactNumber) && (
                                <>
                                    <Divider className="my-4" />
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium">Emergency Contact</p>
                                        {employeeInfo.emergencyContactName && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <p>{employeeInfo.emergencyContactName}</p>
                                            </div>
                                        )}
                                        {employeeInfo.emergencyContactNumber && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <p>{employeeInfo.emergencyContactNumber}</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Right Column - Employment Information */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                            <Briefcase className="h-5 w-5" />
                            Employment Information
                        </h2>
                        <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Position</p>
                                <p className="font-medium mt-1">{employeeInfo.position.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Hire Date</p>
                                <p className="font-medium mt-1">{dayjs(employeeInfo.hireDate).format('DD/MM/YYYY')}</p>
                            </div>
                            {employeeInfo.salary && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Salary</p>
                                    <p className="font-medium mt-1">{formattedSalary}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}
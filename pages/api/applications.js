export const getApplications = async (prisma) => {
    return (
        await prisma.application.findMany({
            where: {},
            orderBy: [
              {
                id: 'desc',
              },
            ],
           
            include: {
              user: true,
              job: true,
            },
        })
    
    )
    }
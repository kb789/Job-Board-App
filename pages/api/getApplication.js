export const getApplication = async (id, prisma) => {
    const application = await prisma.application.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        job: true
      },
    })
  
    return application
  }

  
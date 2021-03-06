USE [master]
GO
/****** Object:  Database [Ing_System]    Script Date: 3/6/2021 19:45:20 ******/
CREATE DATABASE [Ing_System]

ALTER DATABASE [Ing_System] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Ing_System].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Ing_System] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Ing_System] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Ing_System] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Ing_System] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Ing_System] SET ARITHABORT OFF 
GO
ALTER DATABASE [Ing_System] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Ing_System] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Ing_System] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Ing_System] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Ing_System] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Ing_System] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Ing_System] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Ing_System] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Ing_System] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Ing_System] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Ing_System] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Ing_System] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Ing_System] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Ing_System] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Ing_System] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Ing_System] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Ing_System] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Ing_System] SET RECOVERY FULL 
GO
ALTER DATABASE [Ing_System] SET  MULTI_USER 
GO
ALTER DATABASE [Ing_System] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Ing_System] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Ing_System] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Ing_System] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Ing_System] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Ing_System] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Ing_System', N'ON'
GO
ALTER DATABASE [Ing_System] SET QUERY_STORE = OFF
GO
USE [Ing_System]
GO
/****** Object:  Table [dbo].[Boleta]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boleta](
	[IdBoleta] [int] IDENTITY(1,1) NOT NULL,
	[FechaHora] [datetime] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[PalabraClaveConsulta1] [varchar](100) NOT NULL,
	[PalabraClaveConsulta2] [varchar](100) NULL,
	[AsuntoDetallado] [varchar](500) NULL,
	[IpComputadora] [varchar](15) NOT NULL,
	[CantidadCambios] [tinyint] NULL,
	[IdClasificador] [tinyint] NOT NULL,
	[IdRespuesta] [tinyint] NOT NULL,
	[DetalleRespuesta] [varchar](500) NULL,
	[FechaHoraRespuesta] [datetime] NULL,
	[IdUsuarioRespuesta] [int] NULL,
	[IpComputadoraRespuesta] [varchar](15) NULL,
 CONSTRAINT [PK__Boleta__362F6EB689344EDB] PRIMARY KEY CLUSTERED 
(
	[IdBoleta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clasificador]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clasificador](
	[IdClasificador] [tinyint] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](45) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdClasificador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departamento]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departamento](
	[IdDepartamento] [tinyint] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](45) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDepartamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Detalle]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detalle](
	[IdBoleta] [int] NOT NULL,
	[Linea] [int] IDENTITY(1,1) NOT NULL,
	[EvidenciaArchivo] [varchar](450) NOT NULL,
	[Detalle] [varchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdBoleta] ASC,
	[Linea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RespuestaLegal]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RespuestaLegal](
	[IdRespuesta] [tinyint] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](25) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRespuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Session]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Session](
	[IdSession] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[IpComputadora] [varchar](15) NOT NULL,
	[fechaSession] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdSession] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sexo]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sexo](
	[IdSexo] [tinyint] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](15) NULL,
 CONSTRAINT [PK_Sexo] PRIMARY KEY CLUSTERED 
(
	[IdSexo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](150) NOT NULL,
	[IdSexo] [tinyint] NOT NULL,
	[Cedula] [int] NOT NULL,
	[Foto] [varchar](150) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[IdDepartamento] [tinyint] NOT NULL,
	[Correo] [varchar](100) NOT NULL,
	[Celular] [varchar](8) NOT NULL,
	[Contrasenia] [varchar](25) NOT NULL,
 CONSTRAINT [PK__Usuario__645723A633DD7E23] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Boleta]  WITH CHECK ADD  CONSTRAINT [FK_Boleta_Clasificador] FOREIGN KEY([IdClasificador])
REFERENCES [dbo].[Clasificador] ([IdClasificador])
GO
ALTER TABLE [dbo].[Boleta] CHECK CONSTRAINT [FK_Boleta_Clasificador]
GO
ALTER TABLE [dbo].[Boleta]  WITH CHECK ADD  CONSTRAINT [FK_Boleta_Respuesta] FOREIGN KEY([IdRespuesta])
REFERENCES [dbo].[RespuestaLegal] ([IdRespuesta])
GO
ALTER TABLE [dbo].[Boleta] CHECK CONSTRAINT [FK_Boleta_Respuesta]
GO
ALTER TABLE [dbo].[Boleta]  WITH CHECK ADD  CONSTRAINT [FK_Boleta_UsuarioD] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Boleta] CHECK CONSTRAINT [FK_Boleta_UsuarioD]
GO
ALTER TABLE [dbo].[Boleta]  WITH CHECK ADD  CONSTRAINT [FK_Boleta_UsuarioR] FOREIGN KEY([IdUsuarioRespuesta])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Boleta] CHECK CONSTRAINT [FK_Boleta_UsuarioR]
GO
ALTER TABLE [dbo].[Detalle]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Boleta] FOREIGN KEY([IdBoleta])
REFERENCES [dbo].[Boleta] ([IdBoleta])
GO
ALTER TABLE [dbo].[Detalle] CHECK CONSTRAINT [FK_Detalle_Boleta]
GO
ALTER TABLE [dbo].[Session]  WITH CHECK ADD  CONSTRAINT [FK_Session_User] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Session] CHECK CONSTRAINT [FK_Session_User]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Departamento] FOREIGN KEY([IdDepartamento])
REFERENCES [dbo].[Departamento] ([IdDepartamento])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Departamento]
GO
/****** Object:  StoredProcedure [dbo].[sp_Clasificador_delete]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Clasificador_delete]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from Clasificador where IdClasificador=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Clasificador_insertar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Clasificador_insertar]
	--@id tinyint
	@Descripcion varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	insert into Clasificador(Descripcion) values(@Descripcion);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Clasificador_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Clasificador_list]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Clasificador;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Clasificador_modificar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Clasificador_modificar]
	@idClasificador tinyint,
	@Descripcion varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	update Clasificador set Descripcion=@Descripcion where IdClasificador=@idClasificador;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Clasificador_select_by_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Clasificador_select_by_id]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Clasificador where IdClasificador=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Departamento_delete]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Departamento_delete]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from Departamento where IdDepartamento=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Departamento_insertar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Departamento_insertar]
	@Descripcion varchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	insert into Departamento(Descripcion) values(@Descripcion);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Departamento_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Departamento_list]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Departamento;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Departamento_modificar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Departamento_modificar]
	@Descripcion varchar(15),
	@IdDepartamento tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	update Departamento set Descripcion=@Descripcion where IdDepartamento=@IdDepartamento;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Departamento_select_by_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Departamento_select_by_id]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Departamento where IdDepartamento=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RespuestaLegal_delete]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_RespuestaLegal_delete]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from RespuestaLegal where IdRespuesta=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RespuestaLegal_insertar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_RespuestaLegal_insertar]
	--@id tinyint,
	@Descripcion varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	insert into RespuestaLegal(Descripcion) values(@Descripcion);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RespuestaLegal_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_RespuestaLegal_list]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from RespuestaLegal;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RespuestaLegal_modificar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_RespuestaLegal_modificar]
	@id tinyint,
	@Descripcion varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	update RespuestaLegal set Descripcion=@Descripcion where IdRespuesta=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RespuestaLegal_select_by_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_RespuestaLegal_select_by_id]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from RespuestaLegal where IdRespuesta=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Session_insert]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Session_insert]
	 @IdUsuario int,
	 @IpComputadora varchar(15),
	 @FechaSession datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	insert into Session(IdUsuario,IpComputadora,fechaSession) values(@IdUsuario,@IpComputadora,@FechaSession);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Session_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Session_list]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Session;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Session_select_by_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Session_select_by_id]
	 @id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Session where IdSession=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_sexo_delete]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_sexo_delete]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from Sexo where IdSexo=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_sexo_insertar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_sexo_insertar]
	@Descripcion varchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	insert into Sexo(Descripcion) values(@Descripcion);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_sexo_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_sexo_list]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Sexo;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_sexo_modificar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_sexo_modificar]
	@Descripcion varchar(15),
	@IdSexo tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	update Sexo set Descripcion=@Descripcion where IdSexo=@IdSexo;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_sexo_select_by_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_sexo_select_by_id]
	@id tinyint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from Sexo where IdSexo=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_delete]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_delete]
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   delete from Usuario where idUsuario=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_insertar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_insertar]
	@Nombre varchar(100),@Apellidos varchar(150),@Cedula int,@IdSexo tinyint,
	@Foto varchar(150),@FechaNacimiento date, @IdDepartamento tinyint,
	@Correo varchar(100),@Celular varchar(8),@Contrasenia varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    INSERT INTO Usuario(Nombre, Apellidos, Cedula, IdSexo, Foto, FechaNacimiento, IdDepartamento, Correo, Celular, Contrasenia) VALUES(@Nombre, @Apellidos, @Cedula, @IdSexo, @Foto, @FechaNacimiento, @IdDepartamento, @Correo, @Celular, @Contrasenia)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_list]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_list]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT        idUsuario, Nombre, Apellidos, IdSexo, Cedula, Foto, FechaNacimiento, IdDepartamento, Correo, Celular, Contrasenia
FROM            Usuario;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_modificar]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_usuario_modificar]
	@IdUsuario int,@Nombre varchar(100),@Apellidos varchar(150),@Cedula int,@IdSexo tinyint,
	@Foto varchar(150),@FechaNacimiento date, @IdDepartamento tinyint,
	@Correo varchar(100),@Celular varchar(8),@Contrasenia varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   update Usuario set Nombre=@Nombre, Apellidos=@Apellidos, Cedula=@Cedula, IdSexo=@IdSexo,Foto=@Foto, FechaNacimiento=@FechaNacimiento, IdDepartamento=@IdDepartamento, Correo=@Correo,Celular= @Celular, Contrasenia=@Contrasenia where idUsuario=@IdUsuario;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_select_by_cedula_id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_select_by_cedula_id]
	-- Add the parameters for the stored procedure here
	@cedula int,
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Usuario.*,Departamento.Descripcion from Usuario inner join Departamento on Usuario.IdDepartamento=Departamento.IdDepartamento and Usuario.cedula=@cedula and Usuario.IdUsuario=@id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_select_by_Id]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_select_by_Id]
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT        idUsuario, Nombre, Apellidos, IdSexo, Cedula, Foto, FechaNacimiento, IdDepartamento, Correo, Celular, Contrasenia
FROM            Usuario where idUsuario=@id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_usuario_select_by_sesion]    Script Date: 3/6/2021 19:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_usuario_select_by_sesion] 
	-- Add the parameters for the stored procedure here
	@correo varchar(100),
	@password varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from Usuario where correo=@correo and Contrasenia=@password
END
GO
USE [master]
GO
ALTER DATABASE [Ing_System] SET  READ_WRITE 
GO





CREATE PROCEDURE [dbo].[p_boleta_insertar]
	@FechaHora datetime,@IdUsuario int,@PalabraClaveConsulta1 varchar(100),
	@PalabraClaveConsulta2 varchar(100),@AsuntoDetallado varchar(500), @IpComputadora varchar(15),
	@CantidadCambios tinyint,@IdClasificador tinyint,@IdRespuesta tinyint
AS
BEGIN
	
	SET NOCOUNT ON;

    INSERT INTO Boleta(FechaHora, IdUsuario,PalabraClaveConsulta1 , PalabraClaveConsulta2, AsuntoDetallado, IpComputadora, CantidadCambios, IdBoleta, IdRespuesta)
	VALUES(@FechaHora, @IdUsuario, @PalabraClaveConsulta1, @PalabraClaveConsulta2, @AsuntoDetallado, @IpComputadora, @CantidadCambios, @IdClasificador, @IdRespuesta)
END
GO

CREATE PROCEDURE [dbo].[sp_boleta_list]

AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT        IdBoleta, FechaHora, IdUsuario, PalabraClaveConsulta1, PalabraClaveConsulta2, AsuntoDetallado, CantidadCambios, IdClasificador, IdRespuesta
FROM            Boleta;
END
GO



Create PROCEDURE [dbo].[sp_boleta_modificar]
	@IdBoleta int, @IdRespuesta tinyint, @DetalleRespuesta varchar(500),@FechaHoraRespuesta datetime,@IdUsuarioRespuesta int,@IpComputadoraRespuesta varchar(15)
	
AS
BEGIN

	SET NOCOUNT ON;

   update Boleta set IdRespuesta=@IdRespuesta, DetalleRespuesta=@DetalleRespuesta, FechaHoraRespuesta=@FechaHoraRespuesta, IdUsuarioRespuesta=@IdUsuarioRespuesta,IpComputadoraRespuesta=@IpComputadoraRespuesta  where IdBoleta=@IdBoleta;
END
GO

CREATE PROCEDURE [dbo].[sp_boleta_select_by_Id]
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT        IdBoleta, FechaHora, IdUsuario, PalabraClaveConsulta1, PalabraClaveConsulta2, AsuntoDetallado,
	CantidadCambios, IdClasificador, IdRespuesta, DetalleRespuesta, FechaHoraRespuesta,IdUsuarioRespuesta
FROM            Boleta where IdBoleta=@id;
END
GO

CREATE PROCEDURE [dbo].[p_boleta_select]
    @FechaHora datetime,@IdUsuario int,@PalabraClaveConsulta1 varchar(100),
	@PalabraClaveConsulta2 varchar(100),@AsuntoDetallado varchar(500), @IpComputadora varchar(15),
	@CantidadCambios tinyint,@IdClasificador tinyint,@IdRespuesta tinyint
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT        IdBoleta, FechaHora, IdUsuario, PalabraClaveConsulta1, PalabraClaveConsulta2, AsuntoDetallado,
	CantidadCambios, IdClasificador, IdRespuesta, DetalleRespuesta, FechaHoraRespuesta,IdUsuarioRespuesta
FROM            Boleta where FechaHora=@FechaHora and IdUsuario=@IdUsuario and PalabraClaveConsulta1 = @PalabraClaveConsulta1
		and PalabraClaveConsulta2 = @PalabraClaveConsulta2 and AsuntoDetallado = @AsuntoDetallado and
		IpComputadora = @IpComputadora and CantidadCambios = @CantidadCambios and IdClasificador = @IdClasificador and
		IdRespuesta = @IdRespuesta;
END
GO

CREATE PROCEDURE [dbo].[p_detalle_insertar]
	@IdBoleta int,@EvidenciaArchivo varchar(450), @Detalle varchar(500)
	
AS
BEGIN
	
	SET NOCOUNT ON;

    INSERT INTO Detalle(IdBoleta, EvidenciaArchivo,Detalle)
	VALUES(@IdBoleta, @EvidenciaArchivo, @Detalle)
END
GO

CREATE PROCEDURE [dbo].[sp_boleta_detalle_list]

AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT        Boleta.IdBoleta, Boleta.FechaHora, Boleta.IdUsuario, Boleta.PalabraClaveConsulta1, Boleta.PalabraClaveConsulta2, Boleta.AsuntoDetallado, Boleta.CantidadCambios, Boleta.IdClasificador, Boleta.IdRespuesta, Boleta.DetalleRespuesta, Boleta.FechaHoraRespuesta, Boleta.IdUsuarioRespuesta, Boleta.IpComputadoraRespuesta, Detalle.Linea, Detalle.EvidenciaArchivo, Detalle.Detalle
FROM   Boleta INNER JOIN Detalle ON Detalle.IdBoleta = Boleta.IdBoleta;
END
GO

CREATE PROCEDURE [dbo].[sp_boleta_respuestaLegal_list]

AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT        Boleta.IdBoleta, Boleta.FechaHora, Boleta.IdUsuario, Boleta.PalabraClaveConsulta1, Boleta.PalabraClaveConsulta2, Boleta.AsuntoDetallado, Boleta.CantidadCambios, Boleta.IdClasificador, Boleta.DetalleRespuesta, Boleta.FechaHoraRespuesta, Boleta.IdUsuarioRespuesta, Boleta.IpComputadoraRespuesta, RespuestaLegal.Descripcion

FROM   Boleta INNER JOIN RespuestaLegal ON RespuestaLegal.IdRespuesta = Boleta.IdRespuesta;
END
GO

CREATE PROCEDURE [dbo].[sp_boleta_detalle_select_by_Id]
	@id int
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT      Boleta.IdBoleta, Boleta.FechaHora, Boleta.IdUsuario, Boleta.PalabraClaveConsulta1, 
	Boleta.PalabraClaveConsulta2, Boleta.AsuntoDetallado, Boleta.CantidadCambios, Boleta.IdClasificador, 
	Boleta.IdRespuesta, Boleta.DetalleRespuesta, Boleta.FechaHoraRespuesta, Boleta.IdUsuarioRespuesta, 
	Boleta.IpComputadoraRespuesta, Detalle.Linea, Detalle.EvidenciaArchivo, Detalle.Detalle
FROM   Boleta INNER JOIN Detalle ON Detalle.IdBoleta = Boleta.IdBoleta where Boleta.IdBoleta=@id;

END
GO

CREATE PROCEDURE [dbo].[sp_boleta_respuestaLegal_select_by_Id]
	@id int
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT      Boleta.IdBoleta, Boleta.FechaHora, Boleta.IdUsuario, Boleta.PalabraClaveConsulta1,
	Boleta.PalabraClaveConsulta2, Boleta.AsuntoDetallado, Boleta.CantidadCambios, Boleta.IdClasificador,
	Boleta.DetalleRespuesta, Boleta.FechaHoraRespuesta, Boleta.IdUsuarioRespuesta, Boleta.IpComputadoraRespuesta, 
	RespuestaLegal.Descripcion

FROM   Boleta INNER JOIN RespuestaLegal ON RespuestaLegal.IdRespuesta = Boleta.IdRespuesta where Boleta.IdBoleta=@id;

END
GO

ALTER PROCEDURE [dbo].[sp_boleta_list]

AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT        IdBoleta, FechaHora, IdUsuario, PalabraClaveConsulta1, PalabraClaveConsulta2, AsuntoDetallado,
	CantidadCambios, IdClasificador, IdRespuesta, DetalleRespuesta, FechaHoraRespuesta, IdUsuarioRespuesta,
	IpComputadoraRespuesta
FROM   Boleta;
END
GO